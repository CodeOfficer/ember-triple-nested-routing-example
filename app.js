App = Ember.Application.create({
  // LOG_TRANSITIONS_INTERNAL: true,
  LOG_TRANSITIONS: true
});

// ---------------------------
// ROUTES

App.Router.map(function() {
  this.resource('worlds', function() {
    this.resource('world', {path: ':world_id'}, function() {
      this.resource('maps', function() {
        this.resource('map', {path: ':map_id'}, function() {
          this.resource('events', function() {
            this.resource('event', {path: ':event_id'}, function() {});
          });
        });
      });
    });
  });
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    console.log('IndexRoute#redirect');
    var world = App.World.find(3);
    var map = App.Map.find(2);
    var event = App.Event.find(1);
    this.transitionTo("event.index", world, map, event);
  }
});

// WORLD ROUTES

App.WorldsRoute = Ember.Route.extend({
  model: function() {
    console.log('WorldsRoute#model');
    return App.World.find();
  }
});

App.WorldsIndexRoute = Ember.Route.extend({
  model: function() {
    console.log('WorldsIndexRoute#model');
    return this.modelFor('worlds');
  }
});

App.WorldIndexRoute = Ember.Route.extend({
  model: function(params) {
    console.log('WorldIndexRoute#model');
    return this.modelFor('world');
  }
});

// MAP ROUTES

App.MapsRoute = Ember.Route.extend({
  model: function() {
    console.log('MapsRoute#model');
    return App.Map.find();
  }
});

App.MapsIndexRoute = Ember.Route.extend({
  model: function() {
    console.log('MapsIndexRoute#model');
    return this.modelFor('maps');
  }
});

App.MapIndexRoute = Ember.Route.extend({
  model: function(params) {
    console.log('MapIndexRoute#model');
    return this.modelFor('map');
  }
});

// EVENT ROUTES

App.EventsRoute = Ember.Route.extend({
  model: function() {
    console.log('EventsRoute#model');
    return App.Event.find();
  }
});

App.EventsIndexRoute = Ember.Route.extend({
  model: function() {
    console.log('EventsIndexRoute#model');
    return this.modelFor('events');
  }
});

App.EventIndexRoute = Ember.Route.extend({
  model: function(params) {
    console.log('EventIndexRoute#model');
    return this.modelFor('event');
  }
});

// ---------------------------
// CONTROLLERS

App.MapsController = Ember.ArrayController.extend({
  needs: ['world'],
  worldBinding: 'controllers.world.content'
});

App.MapController = Ember.ObjectController.extend({
  needs: ['world'],
  world: null,
  worldBinding: 'controllers.world.content'
});

App.EventsController = Ember.ArrayController.extend({
  needs: ['world', 'map'],
  worldBinding: 'controllers.world.content',
  mapBinding: 'controllers.map.content'
});

App.EventController = Ember.ObjectController.extend({
  needs: ['world', 'map'],
  world: null,
  map: null,
  worldBinding: 'controllers.world.content',
  mapBinding: 'controllers.map.content'
});

// ---------------------------
// STORE

App.Store = DS.Store.extend({
  adapter: "DS.FixtureAdapter"
});

// ---------------------------
// MODELS

App.World = DS.Model.extend({
  name: DS.attr("string")
});

App.Map = DS.Model.extend({
  name: DS.attr("string")
});

App.Event = DS.Model.extend({
  name: DS.attr("string")
});

// ---------------------------
// FIXTURES

App.World.FIXTURES = [
  { id: 1, name: "world 1" },
  { id: 2, name: "world 2" },
  { id: 3, name: "world 3" }
];

App.Map.FIXTURES = [
  { id: 1, name: "map 1" },
  { id: 2, name: "map 2" },
  { id: 3, name: "map 3" }
];

App.Event.FIXTURES = [
  { id: 1, name: "event 1" },
  { id: 2, name: "event 2" },
  { id: 3, name: "event 3" }
];
