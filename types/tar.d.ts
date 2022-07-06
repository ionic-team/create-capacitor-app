// Type definitions for tar 6.1
// Project: https://github.com/npm/node-tar
// Definitions by: Maxime LUCE <https://github.com/SomaticIT>, Connor Peet <https://github.com/connor4312>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TODO: When/if typings for [fstream](https://github.com/npm/fstream) are written, refactor this typing to use it for the various streams.

/// <reference types="node" />

declare module 'tar' {
  import { EventEmitter } from 'events';
  import stream = require('stream');
  import zlib = require('zlib');

  namespace MiniPass {
    interface Options {
      encoding?: string | null | undefined;
      objectMode?: boolean | undefined;
    }
  }

  class MiniPass extends EventEmitter {
    readonly bufferLength: number;
    readonly flowing: boolean;
    readonly emittedEnd: boolean;
    readonly destroyed: boolean;
    encoding: string | null;
    readable: boolean;
    writable: boolean;
    paused: boolean;
    objectMode: boolean;
    pipes: unknown;
    buffer: unknown;

    constructor(options?: MiniPass.Options);

    setEncoding(encoding: string | null): void;
    read(size?: number): unknown;
    write(chunk: unknown, cb?: () => void): boolean;
    write(chunk: unknown, encoding?: string | null, cb?: () => void): boolean;
    end(cb?: () => void): this;
    end(chunk: unknown, cb?: () => void): this;
    end(chunk: unknown, encoding?: string | null, cb?: () => void): this;
    resume(): void;
    pause(): void;
    promise(): Promise<void>;
    collect(): Promise<unknown[]>;
    concat(): Promise<Buffer | string>;
    destroy(err?: unknown): void;
    pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean | undefined }): T;

    addEventHandler(event: string, listener: (...args: unknown[]) => void): this;
    addEventHandler(event: 'data', listener: (chunk: unknown) => void): this;
    addEventHandler(
      event: 'readable' | 'drain' | 'resume' | 'end' | 'prefinish' | 'finish' | 'close',
      listener: () => void
    ): this;

    on(event: string, listener: (...args: unknown[]) => void): this;
    on(event: 'data', listener: (chunk: unknown) => void): this;
    on(event: 'readable' | 'drain' | 'resume' | 'end' | 'prefinish' | 'finish' | 'close', listener: () => void): this;

    once(event: string, listener: (...args: unknown[]) => void): this;
    once(event: 'data', listener: (chunk: unknown) => void): this;
    once(event: 'readable' | 'drain' | 'resume' | 'end' | 'prefinish' | 'finish' | 'close', listener: () => void): this;

    prependListener(event: string, listener: (...args: unknown[]) => void): this;
    prependListener(event: 'data', listener: (chunk: unknown) => void): this;
    prependListener(
      event: 'readable' | 'drain' | 'resume' | 'end' | 'prefinish' | 'finish' | 'close',
      listener: () => void
    ): this;

    prependOnceListener(event: string, listener: (...args: unknown[]) => void): this;
    prependOnceListener(event: 'data', listener: (chunk: unknown) => void): this;
    prependOnceListener(
      event: 'readable' | 'drain' | 'resume' | 'end' | 'prefinish' | 'finish' | 'close',
      listener: () => void
    ): this;

    removeListener(event: string, listener: (...args: unknown[]) => void): this;
    removeListener(event: 'data', listener: (chunk: unknown) => void): this;
    removeListener(
      event: 'readable' | 'drain' | 'resume' | 'end' | 'prefinish' | 'finish' | 'close',
      listener: () => void
    ): this;

    emit(event: string, ...args: unknown[]): boolean;
    emit(event: 'data', chunk: unknown): boolean;
    emit(event: 'readable' | 'drain' | 'resume' | 'end' | 'prefinish' | 'finish' | 'close'): boolean;
  }

  // #region Interfaces

  export interface HeaderProperties {
    devmaj?: number | undefined;
    devmin?: number | undefined;
    gid?: number | undefined;
    gname?: string | undefined;
    mode?: number | undefined;
    mtime?: number | undefined;
    noProprietary?: boolean | undefined;
    path: string;
    size?: number | undefined;
    type?: string | undefined;
    uid?: number | undefined;
    uname?: string | undefined;
  }

  export interface ExtractOptions {
    Directory?: boolean | undefined;
    path?: string | undefined;
    strip?: number | undefined;
    type?: string | undefined;
  }

  export interface ParseStream extends NodeJS.ReadWriteStream {
    _ended: boolean;

    _process(c: Buffer): void;
    _startEntry(c: Buffer): void;

    _stream: stream.Stream;
    _streamEnd(): void;
    position: number;
  }

  export interface PackStream extends NodeJS.ReadWriteStream {
    _buffer: stream.Stream[];
    _currentEntry: unknown;

    _global: HeaderProperties;
    _needDrain: boolean;
    _noProprietary: boolean;
    _paused: boolean;
    _pipeRoot: stream.Stream;
    _process(): void;
    _processing: boolean;
    add(stream: stream.Stream): boolean;

    addGlobal(props: HeaderProperties): void;
    destroy(): void;
    readable: boolean;

    writable: boolean;
  }

  // #endregion

  // #region Enums

  export interface Fields {
    cksum: number;
    devmaj: number;
    devmin: number;
    fill: number;
    gid: number;
    gname: number;
    linkpath: number;
    mode: number;
    mtime: number;
    path: number;
    prefix: number;
    size: number;
    type: number;
    uid: number;
    uname: number;
    ustar: number;
    ustarvar: number;
  }

  export type fields = Fields; // alias for backwards compatbility

  export const fieldSize: number[];
  export const fieldOffs: number[];
  export const fieldEnds: number[];

  /**
   * Different values of the 'type' field
   * paths match the values of Stats.isX() functions, where appropriate
   */
  export const types: {
    '\0': string;
    0: string;
    '': string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    A: string;
    BlockDevice: string;
    CharacterDevice: string;
    ContiguousFile: string;
    ContinuationFile: string;
    D: string;
    Directory: string;
    ExtendedHeader: string;
    FIFO: string;
    File: string;
    GNUDumpDir: string;
    GlobalExtendedHeader: string;
    I: string;
    INode: string;
    K: string;
    L: string;
    Link: string;
    M: string;
    N: string;
    NextFileHasLonLinkPath: string;
    NextFileHasLongPath: string;
    OldExtendedHeader: string;
    OldFile: string;
    S: string;
    SolarisACL: string;
    SymbolicLick: string;
    TapeVolumeHeader: string;
    V: string;
    X: string;
    g: string;
    x: string;
  };

  /**
   * Values for the mode field
   */
  export const modes: {
    gexec: number;
    gread: number;
    gwrite: number;
    oexec: number;
    oread: number;
    owrite: number;
    sgid: number;
    suid: number;
    svtx: number;
    uexec: number;
    uread: number;
    uwrite: number;
  };

  export const numeric: {
    atime: boolean;
    cksum: boolean;
    ctime: boolean;
    dev: boolean;
    devmaj: boolean;
    devmin: boolean;
    gid: boolean;
    ino: boolean;
    mode: boolean;
    mtime: boolean;
    nlink: boolean;
    size: boolean;
    uid: boolean;
  };

  export const knownExtended: {
    atime: boolean;
    charset: boolean;
    comment: boolean;
    ctime: boolean;
    gid: boolean;
    gname: boolean;
    linkpat: boolean;
    mtime: boolean;
    path: boolean;
    realtime: boolean;
    security: boolean;
    size: boolean;
    uid: boolean;
    uname: boolean;
  };

  export const headerSize: number;
  export const blockSize: number;

  export interface ParseOptions {
    filter?: (path: string, entry: ReadEntry) => boolean;
    onentry?: (entry: ReadEntry) => void;
    onwarn?: (code: string, message: string, data: Buffer) => void;
    strict?: boolean;
  }
  /**
   * A writable stream. Write tar data to it and it will emit entry events for each entry parsed from the tarball. This is used by tar.Extract.
   */
  export interface Parse extends ParseStream {
    on(event: 'end' | 'close', listener: () => void): this;
    on(event: 'entry', listener: (entry: ReadEntry) => void): this;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  export const Parse: {
    new (opt?: ParseOptions): Parse;
  };
  //#endregion

  //#region Global Methods

  /**
   * Returns a through stream. Use fstream to write files into the pack stream and you will receive tar archive data from the pack stream.
   * This only works with directories, it does not work with individual files.
   * The optional properties object are used to set properties in the tar 'Global Extended Header'.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export function Pack(props?: HeaderProperties): PackStream;

  /**
   * Returns a through stream. Write tar data to the stream and the files in the tarball will be extracted onto the filesystem.
   * options can be:
   * ```
   * {
   *   path: '/path/to/extract/tar/into',
   *   strip: 0, // how munknown path segments to strip from the root when extracting
   * }
   * ```
   * options also get passed to the fstream.Writer instance that tar uses internally.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export function Extract(opts: ExtractOptions | string): ParseStream;

  export interface FileStat extends stream.Readable, Fields {
    blockRemain: number;
    header: HeaderProperties;
    ignore: boolean;
    meta: boolean;
    remain: number;
    size: number;
    startBlockSize: number;
  }

  export interface ReadEntry extends MiniPass, HeaderProperties {
    /** The number of 512-byte blocks remaining to be written into the stream. */
    blockRemain: number;
    /** The extended metadata object provided to the constructor. */
    extended: unknown;
    /** The global extended metadata object provided to the constructor. */
    globalExtended: unknown;
    /** Whether this entry should be ignored. */
    ignore: boolean;
    /**
     * True if this represents metadata about the next entry, false if it
     * represents a filesystem object.
     */
    meta: boolean;
    /** The number of bytes remaining to be written into the stream. */
    remain: number;
  }

  export interface CreateOptions {
    /**
     * Alias for cwd.
     */
    C?: string | undefined;

    /**
     * Alias for follow.
     */
    L?: boolean | undefined;

    /**
     * Alias for presevePaths.
     */
    P?: boolean | undefined;

    /**
     * The current working directory for creating the archive. Defaults to process.cwd().
     */
    cwd?: string | undefined;

    /**
     * A function that gets called with (path, stat) for each entry being
     * added. Return true to add the entry to the archive, or false to omit it.
     */
    filter?(path: string, stat: FileStat): boolean;

    /**
     * Set to true to pack the targets of symbolic links. Without this
     * option, symbolic links are archived as such.
     */
    follow?: boolean | undefined;

    /**
     * Set to unknown truthy value to create a gzipped archive,
     * or an object with settings for zlib.Gzip()
     */
    gzip?: boolean | zlib.ZlibOptions | undefined;

    /**
     * Alias for follow.
     */
    h?: boolean | undefined;

    /**
     * The mode to set on the created file archive.
     */
    mode?: number | undefined;

    /**
     * Do not recursively archive the contents of directories.
     */
    noDirRecurse?: boolean | undefined;

    /**
     * Suppress pax extended headers. Note that this means that long paths and
     * linkpaths will be truncated, and large or negative numeric values
     * may be interpreted incorrectly.
     */
    noPax?: boolean | undefined;

    /**
     * A function that will get called with (message, data)
     * for unknown warnings encountered.
     */
    onwarn?(message: string, data: Buffer): void;

    /**
     * Omit metadata that is system-specific: ctime, atime, uid, gid, uname,
     * gname, dev, ino, and nlink. Note that mtime is still included,
     * because this is necessary other time-based operations.
     */
    portable?: boolean | undefined;

    /**
     * A path portion to prefix onto the entries in the archive.
     */
    prefix?: string | undefined;

    /**
     * Allow absolute paths. By default, / is stripped from absolute paths.
     */
    preservePaths?: boolean | undefined;

    /**
     * Treat warnings as crash-worthy errors. Default false.
     */
    strict?: boolean | undefined;

    /**
     * Alias for gzip.
     */
    z?: boolean | zlib.ZlibOptions | undefined;
  }

  export interface ExtractOptions {
    /**
     * Alias for cwd.
     */
    C?: string | undefined;

    /**
     * Extract files relative to the specified directory. Defaults to
     * process.cwd(). If provided, this must exist and must be a directory.
     */
    cwd?: string | undefined;

    /**
     * A function that gets called with (path, stat) for each entry being
     * added. Return true to emit the entry from the archive, or false to skip it.
     */
    filter?(path: string, stat: FileStat): boolean;

    /**
     * Set to a number to force ownership of all extracted files and folders,
     * and all implicitly created directories, to be owned by the specified
     * group id, regardless of the gid field in the archive. Cannot be used
     * along with preserveOwner. Requires also setting a uid option
     */
    gid?: number | undefined;

    /**
     * Alias for keep.
     */
    k?: boolean | undefined;

    /**
     * Do not overwrite existing files. In particular, if a file appears more
     * than once in an archive, later copies will not overwrite earlier copies
     */
    keep?: boolean | undefined;

    /**
     * Alias for keep.
     */
    'keep-existing'?: boolean | undefined;

    /**
     * Alias for newer.
     */
    'keep-newer'?: boolean | undefined;

    /**
     * Alias for newer.
     */
    'keep-newer-files'?: boolean | undefined;

    m?: boolean | undefined;

    /**
     * The maximum size of meta entries that is supported. Defaults to 1 MB.
     */
    maxMetaEntrySize?: number | undefined;

    // The following options are mostly internal, but can be modified in some
    // advanced use cases, such as re-using caches between runs.
    /**
     * The maximum buffer size for fs.read() operations (in bytes). Defaults to 16 MB.
     */
    maxReadSize?: number | undefined;

    /**
     * Set to true to keep the existing file on disk if it's newer than
     * the file in the archive.
     */
    newer?: boolean | undefined;

    'no-mtime'?: boolean | undefined;

    /**
     * Set to true to omit calling `fs.chmod()` to ensure that the extracted file
     * matches the entry mode. This also suppresses the call to `process.umask()`
     * to determine the default umask value, since tar will extract with whatever
     * mode is provided, and let the process `umask` apply normally.
     */
    noChmod?: boolean | undefined;

    /**
     * Set to true to omit writing mtime value for extracted entries.
     * [Alias: m, no-mtime]
     */
    noMtime?: boolean | undefined;

    /**
     * A function that gets called with (entry) for each entry that passes the
     * filter.
     */
    onentry?(entry: ReadEntry): void;

    /**
     * A function that will get called with (message, data)
     * for unknown warnings encountered.
     */
    onwarn?(message: string, data: Buffer): void;

    /**
     * Alias for preserveOwner.
     */
    p?: boolean | undefined;

    /**
     * If true, tar will set the uid and gid of extracted entries to the uid
     * and gid fields in the archive. This defaults to true when run as root,
     * and false otherwise. If false, then files and directories will be set
     * with the owner and group of the user running the process. This is
     * similar to -p in tar(1), but ACLs and other system-specific data is
     * never unpacked in this implementation, and modes
     * are set by default already.
     */
    preserveOwner?: boolean | undefined;
    /**
     * Treat warnings as crash-worthy errors. Default false.
     */
    strict?: boolean | undefined;
    /**
     * Remove the specified number of leading path elements. Pathnames with
     * fewer elements will be silently skipped. Note that the pathname
     * is edited after applying the filter, but before security checks.
     */
    strip?: number | undefined;

    /**
     * Alias for strip.
     */
    'strip-components'?: number | undefined;

    /**
     * Alias for strip.
     */
    stripComponents?: number | undefined;

    /**
     * Provide a function that takes an entry object, and returns a stream,
     * or unknown falsey value. If a stream is provided, then that stream's data
     * will be written instead of the contents of the archive entry. If a
     * falsey value is provided, then the entry is written to disk as normal.
     * (To exclude items from extraction, use the filter option described above.)
     */
    transform?(entry: ReadEntry): NodeJS.WritableStream | undefined | false | null;

    /**
     * Set to a number to force ownership of all extracted files and folders,
     * and all implicitly created directories, to be owned by the specified
     * user id, regardless of the uid field in the archive. Cannot be used
     * along with preserveOwner. Requires also setting a gid option.
     */
    uid?: number | undefined;

    /**
     * Unlink files before creating them. Without this option, tar overwrites
     * existing files, which preserves existing hardlinks. With this option,
     * existing hardlinks will be broken, as will unknown symlink that would
     * affect the location of an extracted file.
     */
    unlink?: boolean | undefined;
  }

  export interface ListOptions {
    /**
     * Alias for cwd.
     */
    C?: string | undefined;

    /**
     * Extract files relative to the specified directory. Defaults to
     * process.cwd(). If provided, this must exist and must be a directory.
     */
    cwd?: string | undefined;

    /**
     * A function that gets called with (path, stat) for each entry being
     * added. Return true to emit the entry from the archive, or false to skip it.
     */
    filter?(path: string, entry: FileStat): boolean;

    /**
     * The maximum buffer size for fs.read() operations. Defaults to 16 MB.
     */
    maxReadSize?: number | undefined;

    /**
     * By default, entry streams are resumed immediately after the call to
     * onentry. Set noResume: true to suppress this behavior. Note that by
     * opting into this, the stream will never complete until the entry
     * data is consumed.
     */
    noResume?: boolean | undefined;

    /**
     * A function that gets called with (entry) for each entry that passes the
     * filter. This is important for when both file and sync are set, because
     * it will be called synchronously.
     */
    onentry?(entry: FileStat): void;

    /**
     * Treat warnings as crash-worthy errors. Default false.
     */
    strict?: boolean | undefined;
  }

  export interface ReplaceOptions {
    /**
     * Alias for cwd.
     */
    C?: string | undefined;

    /**
     * Alias for follow.
     */
    L?: boolean | undefined;

    /**
     * Extract files relative to the specified directory. Defaults to
     * process.cwd(). If provided, this must exist and must be a directory.
     */
    cwd?: string | undefined;

    /**
     * Required. Write the tarball archive to the specified filename.
     */
    file: string;

    /**
     * A function that gets called with (path, stat) for each entry being
     * added. Return true to emit the entry from the archive, or false to skip it.
     */
    filter?(path: string, stat: FileStat): boolean;

    /**
     * Set to true to pack the targets of symbolic links. Without this
     * option, symbolic links are archived as such.
     */
    follow?: boolean | undefined;

    /**
     * Set to unknown truthy value to create a gzipped archive,
     * or an object with settings for zlib.Gzip()
     */
    gzip?: boolean | zlib.ZlibOptions | undefined;

    /**
     * Alias for follow.
     */
    h?: boolean | undefined;

    /**
     * The maximum buffer size for fs.read() operations. Defaults to 16 MB.
     */
    maxReadSize?: number | undefined;

    /**
     * Do not recursively archive the contents of directories.
     */
    noDirRecurse?: boolean | undefined;

    /**
     * uppress pax extended headers. Note that this means that long paths and
     * linkpaths will be truncated, and large or negative numeric values
     * may be interpreted incorrectly.
     */
    noPax?: boolean | undefined;

    /**
     * A function that will get called with (message, data)
     * for unknown warnings encountered.
     */
    onwarn?(message: string, data: Buffer): void;

    /**
     * A path portion to prefix onto the entries in the archive.
     */
    prefix?: string | undefined;

    /**
     * Allow absolute paths. By default, / is stripped from absolute paths.
     */
    preservePaths?: boolean | undefined;

    /**
     * Treat warnings as crash-worthy errors. Default false.
     */
    strict?: boolean | undefined;

    /**
     * Act synchronously. If this is set, then unknown provided file will be
     * fully written after the call to tar.c.
     */
    sync?: boolean | undefined;
  }

  export interface FileOptions {
    /**
     * Alias for file.
     */
    f?: string | undefined;

    /**
     * Uses the given file as the input or output of this function.
     */
    file?: string | undefined;
  }

  /**
   * Create a tarball archive. The fileList is an array of paths to add to the
   * tarball. Adding a directory also adds its children recursively. An entry in
   * fileList that starts with an @ symbol is a tar archive whose entries will
   * be added. To add a file that starts with @, prepend it with `./`.
   *
   * Archive data may be read from the returned stream.
   */
  export function create(
    options: CreateOptions,
    fileList: readonly string[],
    callback?: (err?: Error) => void
  ): stream.Readable;

  /**
   * Create a tarball archive. The fileList is an array of paths to add to the
   * tarball. Adding a directory also adds its children recursively. An entry in
   * fileList that starts with an @ symbol is a tar archive whose entries will
   * be added. To add a file that starts with @, prepend it with `./`.
   */
  export function create(options: CreateOptions & FileOptions, fileList: readonly string[]): Promise<void>;
  export function create(options: CreateOptions & FileOptions & { sync: true }, fileList: readonly string[]): void;
  export function create(
    options: CreateOptions & FileOptions,
    fileList: readonly string[],
    callback: (err?: Error) => void
  ): void;

  /**
   * Alias for create
   */
  export const c: typeof create;

  /**
   * Extract a tarball archive. The fileList is an array of paths to extract
   * from the tarball. If no paths are provided, then all the entries are
   * extracted. If the archive is gzipped, then tar will detect this and unzip
   * it. Note that all directories that are created will be forced to be
   * writable, readable, and listable by their owner, to avoid cases where a
   * directory prevents extraction of child entries by virtue of its mode. Most
   * extraction errors will cause a warn event to be emitted. If the cwd is
   * missing, or not a directory, then the extraction will fail completely.
   *
   * Archive data should be written to the returned stream.
   */
  export function extract(
    options: ExtractOptions,
    fileList?: readonly string[],
    callback?: (err?: Error) => void
  ): stream.Writable;

  /**
   * Extract a tarball archive. The fileList is an array of paths to extract
   * from the tarball. If no paths are provided, then all the entries are
   * extracted. If the archive is gzipped, then tar will detect this and unzip
   * it. Note that all directories that are created will be forced to be
   * writable, readable, and listable by their owner, to avoid cases where a
   * directory prevents extraction of child entries by virtue of its mode. Most
   * extraction errors will cause a warn event to be emitted. If the cwd is
   * missing, or not a directory, then the extraction will fail completely.
   */
  export function extract(options: ExtractOptions & FileOptions, fileList?: readonly string[]): Promise<void>;
  export function extract(options: ExtractOptions & FileOptions & { sync: true }, fileList?: readonly string[]): void;
  export function extract(
    options: ExtractOptions & FileOptions,
    fileList: readonly string[] | undefined,
    callback: (err?: Error) => void
  ): void;

  /**
   * Alias for extract
   */
  export const x: typeof extract;

  /**
   * List the contents of a tarball archive. The fileList is an array of paths
   * to list from the tarball. If no paths are provided, then all the entries
   * are listed. If the archive is gzipped, then tar will detect this and unzip
   * it.
   *
   * Archive data should be written to the returned stream.
   */
  export function list(
    options?: ListOptions & FileOptions,
    fileList?: readonly string[],
    callback?: (err?: Error) => void
  ): stream.Writable;

  /**
   * List the contents of a tarball archive. The fileList is an array of paths
   * to list from the tarball. If no paths are provided, then all the entries
   * are listed. If the archive is gzipped, then tar will detect this and unzip
   * it.
   */
  export function list(options: ListOptions & FileOptions, fileList?: readonly string[]): Promise<void>;
  export function list(options: ListOptions & FileOptions & { sync: true }, fileList?: readonly string[]): void;

  /**
   * Alias for list
   */
  export const t: typeof list;

  /**
   * Add files to an existing archive. Because later entries override earlier
   * entries, this effectively replaces unknown existing entries. The fileList is an
   * array of paths to add to the tarball. Adding a directory also adds its
   * children recursively. An entry in fileList that starts with an @ symbol is
   * a tar archive whose entries will be added. To add a file that
   * starts with @, prepend it with ./.
   */
  export function replace(options: ReplaceOptions, fileList?: readonly string[]): Promise<void>;
  export function replace(
    options: ReplaceOptions,
    fileList: readonly string[] | undefined,
    callback: (err?: Error) => void
  ): Promise<void>;

  /**
   * Alias for replace
   */
  export const r: typeof replace;

  /**
   * Add files to an archive if they are newer than the entry already in the
   * tarball archive. The fileList is an array of paths to add to the tarball.
   * Adding a directory also adds its children recursively. An entry in fileList
   * that starts with an @ symbol is a tar archive whose entries will be added.
   * To add a file that starts with @, prepend it with ./.
   */
  export function update(options: ReplaceOptions, fileList?: readonly string[]): Promise<void>;
  export function update(
    options: ReplaceOptions,
    fileList: readonly string[] | undefined,
    callback: (err?: Error) => void
  ): Promise<void>;

  /**
   * Alias for update
   */
  export const u: typeof update;
}
