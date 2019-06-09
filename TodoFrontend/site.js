// <snippet_SiteJs>
const API_ENDPOINT_URI = "//{{TODOAPI_HOST}}:{{TODOAPI_PORT}}/{{TODOAPI_PATH}}";
let todos = null;
function getCount(data) {
  const el = $("#counter");
  let name = "to-do";
  if (data) {
    if (data > 1) {
      name = "to-dos";
    }
    el.text(data + " " + name);
  } else {
    el.text("No " + name);
  }
}

// <snippet_GetData>
$(document).ready(function() {
  getData();
});

function getData() {
  $.ajax({
    type: "GET",
    url: API_ENDPOINT_URI,
    cache: false,
    success: function(data) {
      const tBody = $("#todos");

      $(tBody).empty();

      getCount(data.length);

      $.each(data, function(key, item) {
        const tr = $("<tr></tr>")
          .append(
            $("<td></td>").append(
              $("<input/>", {
                type: "checkbox",
                disabled: true,
                checked: item.isComplete
              })
            )
          )
          .append($("<td></td>").text(item.name))
          .append(
            $("<td></td>").append(
              $("<button>Edit</button>").on("click", function() {
                editItem(item.id);
              })
            )
          )
          .append(
            $("<td></td>").append(
              $("<button>Delete</button>").on("click", function() {
                deleteItem(item.id);
              })
            )
          );

        tr.appendTo(tBody);
      });

      todos = data;
    }
  });
}
// </snippet_GetData>

// <snippet_AddItem>
function addItem() {
  const item = {
    name: $("#add-name").val(),
    isComplete: false
  };

  $.ajax({
    type: "POST",
    accepts: "application/json",
    url: API_ENDPOINT_URI,
    contentType: "application/json",
    data: JSON.stringify(item),
    error: function(jqXHR, textStatus, errorThrown) {
      alert("Something went wrong!");
    },
    success: function(result) {
      getData();
      $("#add-name").val("");
    }
  });
}
// </snippet_AddItem>

function deleteItem(id) {
  // <snippet_AjaxDelete>
  $.ajax({
    url: API_ENDPOINT_URI + "/" + id,
    type: "DELETE",
    success: function(result) {
      getData();
    }
  });
  // </snippet_AjaxDelete>
}

function editItem(id) {
  $.each(todos, function(key, item) {
    if (item.id === id) {
      $("#edit-name").val(item.name);
      $("#edit-id").val(item.id);
      $("#edit-isComplete")[0].checked = item.isComplete;
    }
  });
  $("#spoiler").css({ display: "block" });
}

$(".my-form").on("submit", function() {
  const item = {
    name: $("#edit-name").val(),
    isComplete: $("#edit-isComplete").is(":checked"),
    id: $("#edit-id").val()
  };

  // <snippet_AjaxPut>
  $.ajax({
    url: API_ENDPOINT_URI + "/" + $("#edit-id").val(),
    type: "PUT",
    accepts: "application/json",
    contentType: "application/json",
    data: JSON.stringify(item),
    success: function(result) {
      getData();
    }
  });
  // </snippet_AjaxPut>

  closeInput();
  return false;
});

function closeInput() {
  $("#spoiler").css({ display: "none" });
}
// </snippet_SiteJs>
