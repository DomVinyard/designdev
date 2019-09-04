[![GitYolo flow](https://img.shields.io/badge/Flow-GitYolo-ff69b4)](https://dom.fyi/2019.240) [![Netlify Status](https://api.netlify.com/api/v1/badges/8f857d1f-c68f-424f-a4d2-b473fc4ccddb/deploy-status)](https://app.netlify.com/sites/domfyi/deploys)

# dom.fyi

Notes-app as a backend.

🚀 [Here’s the plan]
🚀 [Blog is live 🎉]
🚀 [My deployment works like this]

### usage

If you want to do the same thing, clone this repo and set the following environment variables.

```
# .env
DROPBOX_TOKEN: string # used by gatsby-config.js -> gatsby-source-dropbox
DROPBOX_FOLDER: string # the name of the folder in dropbox. folder must be at the top level.

NETLIFY_BUILD_HOOK: url # endpoint for build script
```

- Must host with Netlify (edit gatsby-config to configure something else)
- Must tell the [Dropbox Webhook] to point at your NETLIFY_BUILD_HOOK endpoint
- I use [iA Writer] but you can write with any text editor that syncs with Dropbox.

[here’s the plan]: https://dom.fyi/2019.218
[blog is live 🎉]: https://dom.fyi/2019.221
[my deployment works like this]: https://dom.fyi/2019.224
[dropbox webhook]: https://www.dropbox.com/developers/reference/webhooks
[ia writer]: https://ia.net/writer
