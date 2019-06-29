# A Laravel Nova tool to send posts to Buffer.

[![Latest Version on Packagist](https://img.shields.io/packagist/v/ahmic/nova-to-buffer.svg?style=flat-square)](https://packagist.org/packages/ahmic/nova-to-buffer)
![CircleCI branch](https://img.shields.io/circleci/project/github/ahmic/nova-to-buffer/master.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/ahmic/nova-to-buffer/master.svg?style=flat-square)](https://travis-ci.org/ahmic/nova-to-buffer)
[![Quality Score](https://img.shields.io/scrutinizer/g/ahmic/nova-to-buffer.svg?style=flat-square)](https://scrutinizer-ci.com/g/ahmic/nova-to-buffer)
[![Total Downloads](https://img.shields.io/packagist/dt/ahmic/nova-to-buffer.svg?style=flat-square)](https://packagist.org/packages/ahmic/nova-to-buffer)


This is where your description should go. Try and limit it to a paragraph or two.

Add a screenshot of the tool here.

## Installation

You can install the package in to a Laravel app that uses [Nova](https://nova.laravel.com) via composer:

```bash
composer require ahmic/nova-to-buffer
```

Next up, you must register the tool with Nova. This is typically done in the `tools` method of the `NovaServiceProvider`.

```php
// in app/Providers/NovaServiceProvider.php

// ...

public function tools()
{
    return [
        // ...
        new \Ahmic\NovaToBuffer\Tool(),
    ];
}
```

## Usage

Click on the "nova-to-buffer" menu item in your Nova app to see the tool provided by this package.

## Testing

``` bash
composer test
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security

If you discover any security related issues, please email am1r.root@gmail.com instead of using the issue tracker.

## Credits

- [Amir Ahmic](https://github.com/ahmic)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
