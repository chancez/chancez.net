App.Post = DS.Model.extend({
  title: DS.attr('str'),
  body: DS.attr('str'),
  author: DS.attr('str'),
  published: DS.attr('date'),
  isNew: function() {
    var published = this.get('published');
    var today = new Date;
    return days_between(published, today) < 1;
  }.property('published')
});

App.Post.FIXTURES = [
  {
    id: 1,
    title: 'Test Post 1',
    body: 'blah blah blah',
    author: 'Chance',
    published: new Date(2013, 4, 11)
  },
  {
    id: 2,
    title: 'Interesting blog post',
    body: 'Once upon a time..',
    author: 'Chance',
    published: new Date
  },
];