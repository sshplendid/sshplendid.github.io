---
layout: page
title: About
permalink: /about/
---

<div class="wrapper">

	<h2 class="footer-heading">{{ site.title }}</h2>
	<div>
		<p>
			Coding with drinking whatever!<br />
			술 마시는 것을 좋아하고 가끔 개발도 합니다.<br />
			Suwon to Seoul<br /></p>
	</div>
	<div class="footer-col-wrapper">
		<ul class="social-media-list">
			<li><a href="mailto:{{ site.email }}">{{ site.email }}</a></li>
			{% if site.github_username %}
			<li>
				{% include icon-github.html username=site.github_username %}
			</li>
			{% endif %}

			{% if site.twitter_username %}
			<li>
				{% include icon-twitter.html username=site.twitter_username %}
			</li>
			{% endif %}
		</ul>
	</div>
</div>