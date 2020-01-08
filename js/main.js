/**
 * Sets up Justified Gallery.
 */
if (!!$.prototype.justifiedGallery) {
	var options = {
		rowHeight: 140,
		margins: 4,
		lastRow: "justify"
	};
	$(".article-gallery").justifiedGallery(options);
}

function sortRule(arr, rev) {
	if (rev == undefined) {
		rev = 1;
	} else {
		rev = (rev) ? 1 : -1;
	}
	return function(a, b) {
		for (var i = 0; i < arr.length; i++) {
			let attr = arr[i]
			if (a[attr] != b[attr]) {
				if (a[attr] > b[attr]) {
					return rev * 1;
				} else {
					return rev * -1;
				}
			}
		}
	}
}

function renderTagCloud(arr) {
	var data = arr && arr.length > 0 ? arr : [];
	data = data.sort(sortRule(['tagVal'], false))
	if (data.length > 12) {
		data.length = 12;
	}
	var source = {
		localdata: data,
		datatype: "array",
		datafields: [{
			name: 'tagName'
		}, {
			name: 'tagVal'
		}, {
			name: 'url'
		}]
	};
	var dataAdapter = new $.jqx.dataAdapter(source, {});
	$('#tagCloud').jqxTagCloud({
		width: '100%',
		minFontSize: 10,
		maxFontSize: 18,
		minColor: '#00AA99',
		maxColor: '#00FFAA',
		source: dataAdapter,
		displayMember: 'tagName',
		valueMember: 'tagVal'
	});
}

$(document).ready(function() {
	// img
	document.addEventListener("error", function(e) {
		var elem = e.target;
		if (elem.tagName.toLowerCase() == 'img') {
			elem.style.display = 'none'
		}
	}, true);

	// flexslider
	$('.flexslider').flexslider({
		directionNav: true,
		pauseOnAction: false,
		slideshowSpeed: 3000
	});

	// year
	$(".year").html(new Date().getFullYear());

	/**
	 * Shows the responsive navigation menu on mobile.
	 */
	$("#header > #nav > ul > .icon").click(function() {
		$("#header > #nav > ul").toggleClass("responsive");
	});


	/**
	 * Controls the different versions of  the menu in blog post articles 
	 * for Desktop, tablet and mobile.
	 */
	if ($(".post").length) {
		var menu = $("#menu");
		var nav = $("#menu > #nav");
		var menuIcon = $("#menu-icon, #menu-icon-tablet");

		/**
		 * Display the menu on hi-res laptops and desktops.
		 */
		if ($(document).width() >= 1440) {
			menu.css("visibility", "visible");
			menuIcon.addClass("active");
		}

		/**
		 * Display the menu if the menu icon is clicked.
		 */
		menuIcon.click(function() {
			if (menu.css("visibility") === "hidden") {
				menu.css("visibility", "visible");
				menuIcon.addClass("active");
			} else {
				menu.css("visibility", "hidden");
				menuIcon.removeClass("active");
			}
			return false;
		});

		/**
		 * Add a scroll listener to the menu to hide/show the navigation links.
		 */
		if (menu.length) {
			$(window).on("scroll", function() {
				var topDistance = menu.offset().top;

				// hide only the navigation links on desktop
				if (!nav.is(":visible") && topDistance < 50) {
					nav.show();
				} else if (nav.is(":visible") && topDistance > 100) {
					nav.hide();
				}

				// on tablet, hide the navigation icon as well and show a "scroll to top
				// icon" instead
				if (!$("#menu-icon").is(":visible") && topDistance < 50) {
					$("#menu-icon-tablet").show();
					$("#top-icon-tablet").hide();
				} else if (!$("#menu-icon").is(":visible") && topDistance > 100) {
					$("#menu-icon-tablet").hide();
					$("#top-icon-tablet").show();
				}
			});
		}

		/**
		 * Show mobile navigation menu after scrolling upwards,
		 * hide it again after scrolling downwards.
		 */
		if ($("#footer-post").length) {
			var lastScrollTop = 0;
			$(window).on("scroll", function() {
				var topDistance = $(window).scrollTop();

				if (topDistance > lastScrollTop) {
					// downscroll -> show menu
					$("#footer-post").hide();
				} else {
					// upscroll -> hide menu
					$("#footer-post").show();
				}
				lastScrollTop = topDistance;

				// close all submenu"s on scroll
				$("#nav-footer").hide();
				$("#toc-footer").hide();
				$("#share-footer").hide();

				// show a "navigation" icon when close to the top of the page, 
				// otherwise show a "scroll to the top" icon
				if (topDistance < 50) {
					$("#actions-footer > #top").hide();
				} else if (topDistance > 100) {
					$("#actions-footer > #top").show();
				}
			});
		}
	}
});
