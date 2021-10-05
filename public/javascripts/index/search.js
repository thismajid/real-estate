$(document).ready(() => {
  let propertyStatus;
  let propertyCategory;
  let propertyBedroom;
  $(".propertyStatus li").click(function () {
    propertyStatus = $(this)[0].id.split("-")[1];
  });
  $(".propertyCategories li").click(function () {
    propertyCategory = $(this)[0].id.split("-")[1];
  });
  $(".propertyBedroom li").click(function () {
    propertyBedroom = $(this).attr("data-value");
  });

  $("#searchBTN").on("click", (event) => {
    event.preventDefault();
    const title = $("#search-title").val();
    const city = $("#search-city").val();
    const lowerPrice = $("#search-lowPrice").val();
    const highPrice = $("#search-highPrice").val();
    if (
      title ||
      city ||
      lowerPrice ||
      highPrice ||
      propertyStatus ||
      propertyCategory ||
      propertyBedroom
    ) {
      window.location.href = `/search?title=${title}&city=${city}&lowerPrice=${lowerPrice}&highPrice=${highPrice}&status=${propertyStatus}&category=${propertyCategory}&bedroom=${propertyBedroom}`;
    }
  });
});
