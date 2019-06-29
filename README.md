# A Laravel Nova tool to send posts to Buffer

Tired of manually posting links to social networks? This package enables "one click" posting to social networks from Nova dashboard, through [Buffer](https://buffer.com) service.

> [Buffer](https://buffer.com) is a software application for the web and mobile, designed to manage accounts in social networks, by providing the means for a user to schedule posts to Twitter, Facebook, Instagram, and Linkedin, as well as analyze their results and engage with their community. [Wikipedia](https://en.wikipedia.org/wiki/Buffer_(application))
> 
> They offer a free plan for one user and up to three social accounts

## Installation

You can install the package in to a Laravel app that uses [Nova](https://nova.laravel.com) via composer:

```bash
composer require ahmic/nova-to-buffer
```

## Usage

**1.**  Add Buffer access token and profile id(s) to the Laravel's `config/services.php` file
```
// ...

'buffer' => [
    'access_token' => env('BUFFER_ACCESS_TOKEN'),
    'profile_ids' => env('BUFFER_PROFILE_IDS')
]
```
**2.** To enable share component for specific model, you'll need to add the tool to that model's Nova resource. Make sure to specify the class name so the resource tool can load it properly. 

Replace `_URL_` with publicly accessible url for your model. 

```
use Ahmic\NovaToBuffer\NovaToBuffer;

// ...

NovaToBuffer::make()
    ->url(_URL_)
```

>Example `config('app.url').'/posts/'.$this->slug` to get `https://yourdomain.com/posts/model-slug` Construct it according to your url scheme.
>
**3.** All set! Visit detail screen of your model resource, populate fields and click "Send update".

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Plans

- [ ] Option for automatic posting
- [ ] Selecting social channels to post
- [ ] Multiple text input fields for different social channels
- [ ] Scheduling

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security

If you discover any security related issues, please email am1r.root@gmail.com instead of using the issue tracker.

## Credits

- [Amir Ahmic](https://github.com/ahmic)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
