define(function (require) {

  /**
   * All MapperCore modules are defined under namespace `core`.
   * So to create a mapper instance, we need to import the class first.
   */
  let Workspace = require('Workspace');

  /**
   * With class `Mapper`, let create our instance with title "Random Graphs".
   */
  let workspace = new Workspace({
    title: "demo",
    graph: {
      plugins: ['force-simulation', 'draggable', 'labeled'],
    }
  });

  function addDataLoaderBlock(w) {

    w.getSidebar().addBlock(
      require('blocks/FormDataLoader'),
      {
        form: [
          {
            type: 'range',
            config: {
              name: 'interval',
              label: 'Interval',
              value: 5,
              max: 50,
              min: 5,
              step: 5,
            }
          },
          {
            type: 'range',
            config: {
              name: 'overlap',
              label: 'Overlap %',
              value: 50,
              max: 80,
              min: 10,
              step: 5,
            }
          },
          {
            type: 'range',
            config: {
              name: 'dbscan_eps',
              label: 'eps (DBSCAN)',
              value: 0.1,
              max: 0.2,
              min: 0.05,
              step: 0.01,
            }
          },
          {
            type: 'range',
            config: {
              name: 'dbscan_min_samples',
              label: 'min samples (DBSCAN)',
              value: 5,
              max: 10,
              min: 2,
              step: 1,
            }
          },
        ],
        // load edges list from server, you can try different method to load other data format
        loader: function (form, setData, setError) {
          workspace.call('run_mapper', form)
            .then((data) => {
              setData(data);
            })
            .catch((error) => {
              setError(error);
            });
        },
      }
    );
  }

  function addColorFunctionBlock(w) {

    let block = require('blocks/ColorFunctions');
    let config = {
      'selection': [
        {
          name: 'size of node',
          attr: 'size'
        },
        {
          name: 'Average X',
          attr: 'x_mean'
        },
        {
          name: 'Average Y',
          attr: 'y_mean'
        },
        {
          name: 'Average Z',
          attr: 'z_mean'
        }
      ]
    };
    w.getSidebar().addBlock(block, config);
  }

  function addPointCloudBlock(w) {
    w.getSidebar().addBlock(require('modules/PointCloud'), {});
  }

  addDataLoaderBlock(workspace);
  addColorFunctionBlock(workspace);
  addPointCloudBlock(workspace);

  workspace.render();

});
