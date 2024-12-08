from django.templatetags.static import static

UNFOLD = {
    "SITE_ICON":     {
        "light": lambda request: static("assets/favicon.png"),  # light mode
        "dark":  lambda request: static("assets/favicon.png"),  # dark mode
    },
    "SITE_LOGO":     {
        "light": lambda request: static("assets/favicon.png"),  # light mode
        "dark":  lambda request: static("assets/favicon.png"),  # dark mode
    },
    "SITE_SYMBOL":   "speed",
    "SITE_FAVICONS": [
        {
            "rel":   "icon",
            "sizes": "32x32",
            "type":  "image/svg+xml",
            "href":  lambda request: static("assets/favicon.ico"),
        },
    ],
}
