/*global Ember */

(function (window) {
  var App = window.App = Ember.Application.create({
    title: "chancez.net",
    LOG_TRANSITIONS: true
  });

  App.Router.map(function () {
    this.resource('home', { path: '/' }, function() {});
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
    },
    model: function() {
      return App.Post.find();
    }
  });

  App.PostRoute = Ember.Route.extend({
    model: function(params) {
      return App.Post.find(params.post_id);
    }
  });

  App.IndexRoute = Ember.Route.extend({
    redirect: function() {
      this.transitionTo('home');
    }
  });

  App.HomeRoute = Ember.Route.extend({
    enter: function() {
      $(document).attr("title", "Home");
    },
    renderTemplate: function() {
      this.render('home');
    },
    setupController: function(controller, model) {
      this.controllerFor('posts').set('content', App.Post.find());
    }
  });

  App.NavbarController = Ember.ArrayController.extend({
    content: [],
    init: function() {
      var home = App.NavItem.create({
        text: "Home",
        routePath: "home.index",
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

  App.HomeController = Ember.ArrayController.extend({
      needs: ['posts'],

  });


  App.PostsController = Ember.ArrayController.extend({
    recent: function() {
      return this.get('content').filterProperty('isNew', true);
    }.property('content.@each.published')
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

  App.HomeView = Ember.View.extend({
    templateName: 'home',
  });

  App.PostsView = Ember.View.extend({
    templateName: 'posts',
  });

  App.PostView = Ember.View.extend({
    templateName: 'post',
  });

  App.PostItemView = Ember.View.extend({
    templateName: 'post-item',
  });

  App.Store = DS.Store.extend({
    revision: 12,
    adapter: 'DS.FixtureAdapter'
  });

})(this);
