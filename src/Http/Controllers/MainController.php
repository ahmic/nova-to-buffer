<?php

namespace Ahmic\NovaToBuffer\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;

class MainController extends Controller {

    protected $accessToken = '';
    protected $profileIds = [];
    protected $bufferApiUrl = '';

    public function __construct()
    {
        $this->accessToken = config('services.buffer.access_token');
        $this->profileIds = str_replace(' ', '', config('services.buffer.profile_ids'));
        $this->bufferApiUrl = 'https://api.bufferapp.com/1/updates/create.json?access_token=';
    }

    public function __invoke(Request $request)
    {
        if(strlen($this->profileIds) == 0) {
            return response(['status' => 'error', 'message' => 'Error: Buffer profile id is missing in config'], 501);
        }
        if(strlen($this->accessToken) == 0) {
            return response(['status' => 'error', 'message' => 'Error: Buffer access token is missing in config'], 501);
        }
        $profileIds = explode(',', $this->profileIds);

        $validator = Validator::make($request->all(), [
            'url' => 'required|url'
        ]);

        if ($validator->fails()) {
            return response(['status' => 'error', 'message' => $validator->errors()->first('url')], 501);
        }

        $description = $request->input('description', '');
        $url = $request->input('url');
        $now = (boolean)$request->input('now');
        $status = 'success';
        $message = '';

        $postData = [
            'now' => $now,
            'text' => $description,
            'media[link]' => $url
        ];

        $postDataIds = [];
        foreach($profileIds as $profileId) {
            $postDataIds[] = http_build_query(['profile_ids[]' => $profileId]);
        }
        $postDataIds = implode('&', $postDataIds);
        $postData = http_build_query($postData).'&'.$postDataIds;
        // dd($postData);

        try {
            $responseData = json_decode($this->makePostRequest($postData));

            if($responseData === null) {
                return response(['status' => 'error', 'message' => 'Error: Empty Buffer response'], 501);
            }
        } catch (\Exception $e) {
            $status = 'error';
            $message = $e->getMessage();
        }

        return response(['status' => $status, 'message' => $message, 'data' => $responseData], 200);
    }

    public function makePostRequest($postData)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->bufferApiUrl.$this->accessToken);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $server_output = curl_exec($ch);
        curl_close ($ch);

        return $server_output;
    }
}

?>
