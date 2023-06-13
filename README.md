# HTML to ACF

HTML to ACF is a command line interface (CLI) that allows developers to convert their static HTML pages into advanced custom field groups in WordPress backends.

### How does this help?

If you're doing headless WordPress development and driving page content through content mappings with custom fields, then you know that the process of mapping custom fields for every element on the gorgeous static webpage you just build is a pain.

This utility allows you to pass in the local (or remote) URL of any webpage, scrape it, and it will return an importable JSON object that you can drop into ACF for that particular page.

### Usage

Install the CLI and then run the following command to scrape http://localhost/:

`htmltoacf -u http://localhost/ -p "Home Page"`

Optionally, you can provide a parent ID for a wrapper element for the content you want to scrape. I use Sveltekit, and I don't want text elements from my nav or footer elements, so I wrap my <slot></slot> tag in a div with an ID that I pass in to get page specific content. The command looks like this:

`htmltoacf -u http://localhost/ -p "Home Page" -i "page-content"`

You can also run the help command in your terminal to see usage instructions:

`htmltoacf --help`

### Support

This was a quick utility I threw together to make this tedious process faster for some headless WP builds I was doing. It's open source and free, so if you find bugs or you'd like to tweak it, please be my guest. I don't provide support for this utility, and I'm not liable for any custom fields created on production sites using it. Convert at your own risk.