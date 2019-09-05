[![GitYolo flow](https://img.shields.io/badge/Flow-GitYolo-ff69b4)](https://dom.fyi/2019.240) [![Netlify Status](https://api.netlify.com/api/v1/badges/8f857d1f-c68f-424f-a4d2-b473fc4ccddb/deploy-status)](https://app.netlify.com/sites/domfyi/deploys)

# dom.fyi

Notes-app as a backend.

- 🚀 [Here’s the plan]
- 🚀 [Blog is live 🎉]
- 🚀 [My deployment works like this]

### Usage

If you want to do the same thing, clone this repo and set the following environment variables.

```
DROPBOX_TOKEN=string # from Dropbox
DROPBOX_FOLDER=string # Dropbox folder name (folder must be in Dropbox root)
NETLIFY_BUILD_HOOK=url # from Netlify build script URL 
```

- Must host with Netlify (edit gatsby-config to configure something else)
- Must create a new [Dropbox Webhook] to point at your NETLIFY_BUILD_HOOK endpoint
- I use [iA Writer] but you can write with any text editor that syncs with Dropbox.

### Random Blog posts

- 🚂 [first post]
- 📚 [first book review]
- 💻 [first mini app]
- 📄 [license]


[here’s the plan]: https://dom.fyi/2019.218
[blog is live 🎉]: https://dom.fyi/2019.221
[my deployment works like this]: https://dom.fyi/2019.224
[dropbox webhook]: https://www.dropbox.com/developers/reference/webhooks
[ia writer]: https://ia.net/writer
[first post]: https://dom.fyi/2019.216
[first book review]: https://dom.fyi/2019.237
[first mini app]: https://dom.fyi/2019.242
[license]: https://dom.fyi/2019.246
