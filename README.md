[![GitYolo flow](https://img.shields.io/badge/Flow-GitYolo-ff69b4)](https://dom.fyi/2019.240) [![Netlify Status](https://api.netlify.com/api/v1/badges/8f857d1f-c68f-424f-a4d2-b473fc4ccddb/deploy-status)](https://app.netlify.com/sites/domfyi/deploys)

# dom.fyi

> I want my notes app to be the back-end for this content. I don’t want to do anything except write little notes. No upload process, no logging in to anywhere, no faffing.

1. Create a new note every day with the date as the title (in the [correct format])
2. Write some stuff
3. Add a rocket emoji (🚀) on the first line

Use any notes app that can sync with Dropbox. (I use [iA Writer]). Write anywhere, Dropbox keeps all your devices (and the blog) in sync at all times as a single source of truth.

![image][image]

### Usage

If you want to launch your own auto-deploy notes-as-a-backend blog this should be a good starting point. Clone this repo and set the following environment variables.

```
NETLIFY_BUILD_HOOK=url # from Netlify
DROPBOX_TOKEN=string # from Dropbox
DROPBOX_FOLDER=string # The folder with your .md files
```

1. Link your repo to a Netlify Site
2. Get a [Dropbox Developers] token and create a folder in Dropbox for your notes
3. Configure a [Dropbox Webhook] to point at your `NETLIFY_BUILD_HOOK` endpoint

### Sample blog posts

- 🚂 [first post]
- 📚 [first book review]
- 💻 [first mini app]
- 📄 [license]

[correct format]: https://dom.fyi/2019.220
[dropbox developers]: https://www.dropbox.com/developers/documentation/http/overview
[dropbox webhook]: https://www.dropbox.com/developers/reference/webhooks
[ia writer]: https://ia.net/writer
[first post]: https://dom.fyi/2019.216
[first book review]: https://dom.fyi/2019.237
[first mini app]: https://dom.fyi/2019.242
[license]: https://dom.fyi/2019.246

[image]: https://i.imgur.com/wZNU5lm_d.jpg
