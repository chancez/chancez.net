/*global Ember */

(function (window) {
  var App = window.App = Ember.Application.create({
    title: "chancez.net",
    LOG_TRANSITIONS: true
  });

  App.Router.map(function () {
    this.resource('index', { path: '/' }, function() {
      this.route('home');
    });
    this.resource('posts', function() {
      this.route('new');
    });
    this.resource('post', { path: '/post/:post_id' }, function() {
      this.route('edit');
      this.resource('comments', function() {
        this.route('new');
      });
    });
  });

  App.PostsRoute = Ember.Route.extend({
    enter: function() {
      $(document).attr("title", "Blog");
    }
  //   model: function() {
  //     return App.Post.all();
  //   }
  });

  // App.PostRoute = Ember.Route.extend({
  //   model: function(params) {
  //     return App.Post.find(params.post_id);
  //   }
  // });

  App.IndexRoute = Ember.Route.extend({
    redirect: function() {
      this.transitionTo('index.home');
    }
  });

  App.IndexHomeRoute = Ember.Route.extend({
    enter: function() {
      $(document).attr("title", "Home");
    },
    renderTemplate: function() {
      this.render('home');
    }
  });

  // App.ApplicationController = Ember.Controller.extend({
  //     needs: ['navbar'],
  // });

  App.NavbarController = Ember.ArrayController.extend({
    content: [],
    init: function() {
      var home = App.NavItem.create({
        text: "Home",
        routePath: "index.home",
        routeName: "home"
      });

      var blog = App.NavItem.create({
          text: "Blog",
          routePath: "posts.index",
          routeName: "posts"
      });

      this.set("content", [home, blog]);
    }
  });

  App.ApplicationView = Ember.View.extend({
    templateName: "application",
  });

  App.NavbarView = Ember.View.extend({
    templateName: 'navbar',
    selectedRouteName: 'home',
    gotoRoute: function(e) {
      this.set('selectedRouteName', e.routeName);
      this.get('parentView.controller.target.router').transitionTo(e.routePath);
    },

    MenuItemView: Ember.View.extend({
      templateName: 'menu-item',
      tagName: 'li',
      classNameBindings: ['IsActive:active'],
      IsActive: function() {
        return this.get('item.routeName') === this.get('parentView.selectedRouteName');
      }.property('item', 'parentView.selectedRouteName')
    })

  });

  // App.HomeView = Ember.View.extend({
  //   templateName: 'home',
  // });

  App.PostsView = Ember.View.extend({
    templateName: 'posts',
  });

})(this);
