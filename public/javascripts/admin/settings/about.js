var oldAttributes = [];
var newAttributes = [];
var allAttributes = [];

$(document).ready(() => {
  $(".addAttribute").on("click", () => {
    let attribute = $("#attributeInput").val();
    if (attribute) {
      newAttributes.push(attribute);
      let generate = (Math.random() + 1).toString(36).substring(7);
      $("#newAttributesUL").append(
        `<li style="padding: 10px 0">${attribute}<div class='d-inline mr-2' onclick="deleteMe(this.id)" id="li-${generate}"><i class="fas fa-times text-danger"></i></div></li>`
      );
      $("#attributeInput").val("");
    }
  });
  $("#aboutBTN").on("click", () => {
    const introduction = $("#introductionInput").val();
    $("#ulAttributes li").each(function () {
      oldAttributes.push(this.innerText.trim());
    });
    allAttributes = oldAttributes.concat(newAttributes);
    $.ajax({
      type: "post",
      url: "/admin/settings/about",
      data: {
        introduction,
        attributes: JSON.stringify(allAttributes),
      },
      success: function (response) {
        Swal.fire({
          icon: "success",
          title: "تغییرات با موفقیت اعمال شد.",
        });
        setTimeout(() => {
          location.reload();
        }, 3000);
      },
    });
  });
});

function deleteMe(id) {
  const val = document.getElementById(id).parentNode.innerText;
  const oldIndex = oldAttributes.indexOf(val);
  const newIndex = newAttributes.indexOf(val);
  if (oldIndex !== -1) {
    oldAttributes.splice(oldIndex, 1);
  }
  if (newIndex !== -1) {
    newAttributes.splice(newIndex, 1);
  }
  document.getElementById(id).parentNode.remove();
}
