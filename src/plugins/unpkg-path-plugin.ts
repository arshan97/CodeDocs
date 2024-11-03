import axios from "axios";
import * as esbuild from "esbuild-wasm";
import localforage from "localforage";

export const unpkgPathPlugin = (input: string) => {
  const fileCache = localforage.createInstance({
    name: "fileCache",
  });

  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      //Handle root entry file of index.js
      build.onResolve({ filter: /(^index\.js$)/ }, async (args: any) => {
        return { namespace: "a", path: "index.js" };
      });

      //Handle relative paths in module
      build.onResolve({ filter: /^\.+\// }, (args) => {
        return {
          namespace: "a",
          path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
            .href,
        };
      });

      //Handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: input,
          };
        }

        //caching
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        if (cachedResult) {
          return cachedResult;
        }

        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
