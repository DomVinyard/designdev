[![GitYolo flow](https://img.shields.io/badge/Flow-GitYolo-ff69b4)](https://dom.fyi/2019.240) 

# dom.fyi

Use any notes app that supports [markdown] and syncs with Dropbox (I use [iA Writer]). 

1. Create a new note every day with the [date] as the title
2. Write some stuff
3. Add a rocket emoji (🚀) on the first line to mark 'published'.

That's it. The build script 👉 [![Netlify Status](https://api.netlify.com/api/v1/badges/8f857d1f-c68f-424f-a4d2-b473fc4ccddb/deploy-status)](https://app.netlify.com/sites/domfyi/deploys) 👈 ignores everything without a rocket. Write anywhere, Dropbox keeps all your devices (and the blog) in sync at all times as a single source of truth. Like this:

![image][image]

### Demo

- 🚀 [first note]
- 📄 [list of notes]
- 🃏 [blackjack]
- 👮‍ [license]

### Usage

If you want to launch your own auto-deploy notes-as-a-backend blog (and can write a bit of javascript) this should be a good starting point. Clone this repo and set the following environment variables.

```
NETLIFY_BUILD_HOOK=url # from Netlify
DROPBOX_TOKEN=string   # from Dropbox
DROPBOX_FOLDER=string  # Folder Name containing .md notes
```

1. Link your cloned repo to an empty Netlify Site and swap the 'dom.fyi' title for your title 
2. Get a [Dropbox Developers] token and create a folder in Dropbox for your notes
3. Configure a [Dropbox Webhook] to point at your `NETLIFY_BUILD_HOOK` endpoint

[date]: https://dom.fyi/2019.220
[dropbox developers]: https://www.dropbox.com/developers/documentation/http/overview
[dropbox webhook]: https://www.dropbox.com/developers/reference/webhooks
[markdown]: https://daringfireball.net/projects/markdown/
[ia writer]: https://ia.net/writer
[first note]: https://dom.fyi/2019.216
[list of notes]: https://dom.fyi/list
[blackjack]: https://dom.fyi/2019.242
[license]: https://dom.fyi/2019.246

[image]: https://i.imgur.com/wZNU5lm_d.jpg?maxwidth=1280&shape=thumb&fidelity=medium
