/*global Ember */

(function (window) {
  var App = window.App = Ember.Application.create();

  App.Router.map(function () {
    this.resource('index', { path: '/' }, function() {
      this.route('home');
    });
  });

  App.IndexRoute = Ember.Route.extend({
    redirect: function() {
      this.transitionTo('index.home');
    }
  });

  App.IndexHomeRoute = Ember.Route.extend({
      renderTemplate: function() {
        this.render('home');
      }
  });

  App.NavbarController = Ember.ArrayController.extend({
    content: [],
    init: function() {
      var home = App.NavItem.create({
        text: "Home",
        routePath: "index.home",
        routeName: "home",
      });

      this.set("content", [home]);
    }
  });

  App.ApplicationView = Ember.View.extend({
    templateName: "application",

    NavbarView: Ember.View.extend({
      templateName: 'navbar',
      needs: ['navbar'],
      init: function() {
        this._super();
        this.set('controller', this.get('parentView.controller').controllerFor('navbar'));
      },
      selectedRouteName: 'home',
      gotoRoute: function(e) {
        this.set('selectedRouteName', e.routeName);
        this.get('controller.target.router').transitionTo(e.routePath);
      },

      MenuItemView: Ember.View.extend({
        templateName: 'menu-item',
        tagName: 'li',
        classNameBindings: ['IsActive:active'],
        IsActive: function() {
          return this.get('item.routeName') === this.get('parentView.selectedRouteName');
        }.property('item', 'parentView.selectedRouteName')
      })

    })
  });


})(this);
