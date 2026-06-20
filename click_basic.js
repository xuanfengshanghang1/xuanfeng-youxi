(function() {
  var links = document.querySelectorAll('a, [role=menuitem], [class*=nav] li, [class*=sidebar] li');
  for (var i = 0; i < links.length; i++) {
    if (links[i].textContent.trim() === '基础配置') {
      links[i].click();
      return 'clicked: 基础配置';
    }
  }
  return 'not found';
})()