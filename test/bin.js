var child = require('child_process');
var http = require('http');
var test = require('tape');
var fs = require('fs');
var path = require('path');
var url = require('url');

var bin = require('../package.json').bin['amok'];
var version = [
  '-V',
  '--version',
];

version.forEach(function (arg) {
  var args = [bin, arg];
  test(args.join(' '), function (test) {
    test.plan(2);

    var cli = child.spawn('node', args);

    cli.stdout.on('data', function (data) {
      var message = data.toString();
      test.equal(message, require('../package.json').version + '\n');
    });

    cli.on('close', function (code) {
      test.equal(code, 0);
    });
  });
});

var help = [
  '-h',
  '--help'
];

help.forEach(function (arg) {
  var args = [bin, arg];

  test('bin print help', function (test) {
    test.plan(2);

    test.comment(args.join(' '));
    var cli = child.spawn('node', args);

    cli.stdout.on('data', function (data) {
      var message = data.toString();
      test.ok(message.indexOf('Usage:') > -1);
    });

    cli.on('close', function (code) {
      test.equal(code, 0);
    });
  });
});