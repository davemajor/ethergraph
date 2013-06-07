Points = new Meteor.Collection('points');

if (Meteor.isClient) {

  Template.grapher.rendered = function () {
    var elt = document.getElementById('graphpaper');
    var graphpaper = Desmos.Graphpaper(elt);

    var query = Points.find({});
    var handle = query.observeChanges({
      added: function (id, point) {
        graphpaper.setExpression({id: id, latex:point.latex});
      },
      removed: function(id) {
        graphpaper.setExpression({id: id, latex:""});
      }
    });
  }

  Template.grapher.events({
    'click button[name="addPoint"]' : function () {
      var equation = $('#equation-entry-box');
      Points.insert({latex:equation.mathquill('latex')});
    }
  });

  Template.expressions.expressions = function () {
    return Points.find({});
  }

  Template.expression.rendered = function () {
    $(this.find('span')).mathquill();
  }

  Template.expression.events({
    'click a': function () {
      Points.remove({_id:this._id});
    }
  });
}
