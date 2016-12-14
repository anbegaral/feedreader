/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('has a URL defined and not empty', function(){
            for(var i = 0; i < allFeeds.length; i++){
              //has a URL defined
              expect(allFeeds[i].url).toBeDefined();
              //URL is not empty
              expect(allFeeds[i].url).not.toBe('');
            }
         });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('has a name defined and not empty', function(){
            for(var i = 0; i < allFeeds.length; i++){
              //has a name defined
              expect(allFeeds[i].name).toBeDefined();
              //the name is not empty
              expect(allFeeds[i].name).not.toBe('');
            }
         });
    });

    describe('The menu', function() {
        /* This test ensures the menu element is
         * hidden by default.
         */
         it('is hidden by default', function(){
           //The class that hides the menu is present
           expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('displays when clicked and hides when clicked again', function(){
            //Click on the icon
            $('.menu-icon-link').click();
            //The menu-hidden class dissapears
            expect($('body').hasClass('menu-hidden')).toBe(false);
            //Click again
            $('.menu-icon-link').click();
            //the menu-hidden class is loaded
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });

    describe('Initial Entries', function() {
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
           //calling the loadFeed function before the test
         beforeEach(function(done){
           loadFeed(0, done);
         });
         it('has at least one element', function(done){
           //the .entry element length is greater than 0
           expect($('.feed .entry').length).toBeGreaterThan(0);
           done();
         });

     });

    describe('New Feed Selection', function() {
        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         var initialLoad;
         var secondLoad;
         //calling loadFeed and storing the content in variable initialLoad
         //using beforeEach because the function is asynchronous and we need the content once it is finished
         beforeEach(function(done) {
            loadFeed(0, function(){
              initialLoad = $('.feed .entry h2').text();
              done();
            });
         });
          //calling loadFeed with different index and storing content in variable secondLoad
         beforeEach(function(done) {
            loadFeed(1, function(){
              secondLoad = $('.feed .entry h2').text();
              done();
            });
          });

          //Loading again the initial feeds
          afterAll(function(done){
            loadFeed(0, done);
          });

         //checking the contents are different
         it('changes the content', function(){
           expect(initialLoad).not.toBe(secondLoad);
         });
   });
}());
