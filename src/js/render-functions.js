export const galleryMarkup = images => {
  return images
    .map(
      ({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) =>
        `<li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img
          class="gallery-image"
          src="${webformatURL}"
          alt="${tags}"
        />
      </a>
      <ul class="item-gallery-data">
		<li class="item-info">
			<h2 class="item-gallery-title">Likes</h2>
			<p class="item-gallery-result">${likes}</p>
		</li>
		<li class="item-info">
			<h2 class="item-gallery-title">Views</h2>
			<p class="item-gallery-result">${views}</p>
		</li>
		<li class="item-info">
			<h2 class="item-gallery-title">Comments</h2>
			<p class="item-gallery-result">${comments}</p>
		</li>
		<li class="item-info">
			<h2 class="item-gallery-title">Downloads</h2>
			<p class="item-gallery-result">${downloads}</p>
		</li>
	</ul>
    </li>`)
    .join('');
};