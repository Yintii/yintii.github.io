$(document).ready(function(){
  let grid = $('#recommended-books').isotope({
    itemSelector: '.book',
    layoutMode: 'masonry'
  });

  grid.imagesLoaded().progress( function(){
    grid.isotope('layout');
  });

});


