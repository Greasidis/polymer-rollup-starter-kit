import { app, loadedPromise } from './appCore';
import { init as appThemeInit } from './appTheme';

appThemeInit();


app.displayInstalledToast = function() {
  // Check to make sure caching is actually enabled—it won't be in the dev environment.
  if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
    Polymer.dom(document).querySelector('#caching-complete').show();
  }
};

// Scroll page to top and expand header
app.scrollPageToTop = function() {
  app.$.headerPanelMain.scrollToTop(true);
};

app.closeDrawer = function() {
  app.$.paperDrawerPanel.closeDrawer();
};

app.reloadRepositories = function() {
  console.log(`reloadRepositories!`);
  app.repos.map((repo) => {
    return repo.updateDetails().then(() => {
      let i = app.repos.indexOf(repo);
      if (i >= 0) {
        var path = `repos.#${i}.stargazers_count`;
        console.log(`Updated ${repo.name} ${path} Stars: ${app.get(path)}`);

        app.notifyPath(path, app.get(path));
      }
    }, (e) => { console.error('Error:', e); });
  });
};


loadedPromise.then(() => {
  console.log('Our app is ready to rock!');
});
