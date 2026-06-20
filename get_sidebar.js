(function() {
  var items = document.querySelectorAll('.qcs-sidebar a, .qcs-sidebar li, [class*=sidebar] a, [class*=menu] a');
  var texts = [];
  for (var i = 0; i < items.length; i++) {
    texts.push(items[i].textContent.trim());
  }
  return texts.join(' | ');
})()