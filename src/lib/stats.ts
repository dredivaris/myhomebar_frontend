/*
  A `Stats` instance wraps client/server Webpack stats to provide
  helper functions to obtain chunk names, etc.
*/

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import * as lodash from "lodash";

// ----------------------------------------------------------------------------

export interface IStats {
  assetsByChunkName?: {
    main: string | string[];
  };
}

// Config for `Stats` instances
const config = new WeakMap<Stats, IStats>();

export default class Stats {
  // --------------------------------------------------------------------------
  /* PUBLIC METHODS */
  // --------------------------------------------------------------------------

  /* CONSTRUCTOR */
  public constructor(stats: IStats = {}) {
    // Store a raw copy of the config
    config.set(this, stats);
  }

  /* GETTERS */

  // Get the full, raw stats
  public get raw(): any {
    return config.get(this)!;
  }

  // Get main built asset based on file extension
  public main(ext: string): string | undefined {
    const main: string | string[] = lodash.get(
      config.get(this)!,
      "assetsByChunkName.main",
      []
    );
    // @ts-ignore
    const file = (Array.isArray(main) ? main : [main]).find((c: string) => c.endsWith(`.${ext}`));
    return file && `/${file}`;
  }

  public scripts(): string[] {
    const initial = this.raw.chunks.find((chunk: any) => chunk.initial);
    // workaround for esnext not properly installed

    // @ts-ignore
    try {
      Object.defineProperty(Array.prototype, 'flat', {
        value: function(depth: any = 1) {
        return this.reduce(function (flat: any, toFlatten: any) {
          // @ts-ignore
          return flat.concat((Array.isArray(toFlatten) && (depth-1)) ? toFlatten.flat(depth-1) : toFlatten);
        }, []);
      }
      });
    }
    catch (e) {}

    const scripts: string[] = initial.siblings
      .map((sibling: any) =>
        this.raw.chunks.find((chunk: any) => chunk.id === sibling)
      )
      .map((sibling: any) => sibling.files)
      .concat(initial.files)
      .flat()
      .filter((file: string) => file.endsWith(".js"))
      .map((file: string) => `/${file}`);

    return scripts;
  }
}
