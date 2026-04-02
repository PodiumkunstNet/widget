# Server configuration needed when deploying the widget

## Apache .htaccess

```apacheconf
# Redirect 301 /configure https://widget.podiumkunst.net/configure.html
# Redirect 301 /embed https://widget.podiumkunst.net/embed.html
# Redirect 301 /widget/more https://widget.podiumkunst.net/widget/more.html
# Redirect 301 /widget https://widget.podiumkunst.net/widget.html

Options -MultiViews
RewriteEngine On

# Redirect /configure and /configure/ to configure.html
RewriteRule ^configure/?$ /configure.html [L]

# Redirect /widget and /widget/ to widget.html
RewriteRule ^widget/?$ /widget.html [L]

# Redirect /widget/more and /widget/more/ to widget/more.html
RewriteRule ^widget/more/?$ /widget/more.html [L]
```

