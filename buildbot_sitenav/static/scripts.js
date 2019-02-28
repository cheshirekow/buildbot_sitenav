BOWERDEPS = (typeof BOWERDEPS === 'undefined') ? {} : BOWERDEPS;

// JSON.stringify() but ignore any circular references. Allows us to dump
// certain objects to the console for debug/inference.
// https://stackoverflow.com/a/11616993/141023
function StringifyCircular(o) {
  var cache = [];
  return JSON.stringify(o, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Duplicate reference found
        try {
          // If this value does not reference a parent it can be deduped
          return JSON.parse(JSON.stringify(value));
        } catch (error) {
          // discard key if value cannot be deduped
          return;
        }
      }
      // Store value in our collection
      cache.push(value);
    }
    return value;
  });
}

(function () {
  function configFn(
    $stateProvider, glMenuServiceProvider, config) {


    var label = "Site Nav";
    if ("label" in config.plugins.sitenav) {
      label = config.plugins.sitenav.label;
    }

    // Add a menu group with the desired label
    glMenuServiceProvider.addGroup({
      name: 'sitenav',
      caption: label,
      icon: 'globe',
      order: 0
    });

    // Add a menu item for each link in the configuration. The state object
    // for each menu item contains just a 'sitenav' key holding the url that
    // we redirect to.
    var idx = 0;
    config.plugins.sitenav.links.forEach(function (elem) {
      var label = elem[0];
      var url = elem[1];

      $stateProvider.state({
        name: 'sitenav-' + idx,
        controller: 'sitenavController',
        data: {
          group: 'sitenav',
          caption: label,
        },
        sitenav: url
      });

      idx = idx + 1;
    });
  }

  // TODO(josh): I'm not sure how much of this we actually need. I suspect
  // at the very least bbData can be dropped.
  var requires = [
    'ui.router', 'ui.bootstrap', 'ngAnimate', 'guanlecoja.ui', 'bbData'];

  angular.module('sitenav', requires).config([
    '$stateProvider', 'glMenuServiceProvider', 'config', configFn]);

}).call(this);

(function () {
  // Stub controller class. Our controller is fake. All it does is redirect
  // on construction.
  class Controller {
    constructor($scope, $state) {
      this.$scope = $scope;
      this.$state = $state;
      window.location.href = $state.current.sitenav;
    }
  }

  angular.module('sitenav').controller('sitenavController', [
    '$scope', '$state', Controller]);

}).call(this);
