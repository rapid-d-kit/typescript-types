
/**
 * **IReader** - An interface that represents a reader capable of reading data in the form of a `Uint8Array` (or any type that extends `Uint8Array`, such as `Buffer`).
 *
 * This interface provides a method to read bytes of data, allowing for flexibility in how data is read, whether it's from a stream, file, or buffer. The `readable` property indicates whether the reader is currently capable of reading data.
 *
 * @template T - A type that extends `Uint8Array` (such as `Buffer`), representing the type of the data being read.
 *
 * ### Example Usage:
 *
 * ```typescript
 * const reader: IReader = {
 *   read(bytes?: number): Uint8Array { // implementation },
 *   get readable() { // implementation }
 * };
 *
 * const data = reader.read(1024); // Reads up to 1024 bytes
 * if (reader.readable) { 
 *   // Can continue reading
 * }
 * ```
 *
 * ### Behavior:
 * - The `read` method returns data in the form of a `Uint8Array` (or any subtype like `Buffer`).
 * - The `readable` property indicates whether there is data available for reading.
 * - Allows for flexible reading of data, either fully or partially, depending on the provided argument for the number of bytes.
 */
export interface IReader<T extends Uint8Array = Buffer> {
  
  /**
   * Reads data from the source, returning a `Uint8Array` (or subtype) containing the data.
   * 
   * @param bytes - The number of bytes to read (optional). If not specified, it may read all available data.
   * @returns A `Uint8Array` containing the read data.
   */
  read(bytes?: number): T;

  /**
   * A property that indicates whether the reader is currently capable of reading data.
   * 
   * Returns `true` if the reader can provide data; otherwise, returns `false`.
   */
  readonly readable: boolean;
}


/**
 * **IWriter** - An interface that represents a writer capable of writing data in the form of a `Uint8Array` (or any type that extends `Uint8Array`, such as `Buffer`).
 *
 * This interface provides a method to write data, typically to a stream, file, or buffer. It abstracts the process of writing, allowing for various types of writing mechanisms while ensuring that the data is written in a consistent type (i.e., `Uint8Array` or its subtype).
 *
 * @template T - A type that extends `Uint8Array` (such as `Buffer`), representing the type of the data being written.
 *
 * ### Example Usage:
 *
 * ```typescript
 * const writer: IWriter = {
 *   write(data: Uint8Array): void { // implementation }
 * };
 *
 * writer.write(new Uint8Array([1, 2, 3])); // Writes data to the target
 * ```
 *
 * ### Behavior:
 * - The `write` method accepts data in the form of a `Uint8Array` (or subtype like `Buffer`).
 * - The method returns nothing (`void`), as it is focused on performing the write operation.
 * - Enables flexible writing to various types of storage or streams, using `Uint8Array` or similar data types.
 */
export interface IWriter<T extends Uint8Array = Buffer> {

  /**
   * Writes data to the destination, typically a stream, file, or buffer.
   * 
   * @param data - The data to be written, represented as a `Uint8Array` (or subtype like `Buffer`).
   */
  write(data: T): void;
}



/**
 * The payload that flows in readable stream events.
 */
export type ReadableStreamEventPayload<T> = T | Error | 'end';

export interface ReadableStreamEvents<T> {

	/**
	 * The 'data' event is emitted whenever the stream is
	 * relinquishing ownership of a chunk of data to a consumer.
	 *
	 * NOTE: PLEASE UNDERSTAND THAT ADDING A DATA LISTENER CAN
	 * TURN THE STREAM INTO FLOWING MODE. IT IS THEREFOR THE
	 * LAST LISTENER THAT SHOULD BE ADDED AND NOT THE FIRST
	 *
	 * Use `listenStream` as a helper method to listen to
	 * stream events in the right order.
	 */
	on(event: 'data', callback: (data: T) => void): void;

	/**
	 * Emitted when any error occurs.
	 */
	on(event: 'error', callback: (err: Error) => void): void;

	/**
	 * The 'end' event is emitted when there is no more data
	 * to be consumed from the stream. The 'end' event will
	 * not be emitted unless the data is completely consumed.
	 */
	on(event: 'end', callback: () => void): void;
}

/**
 * A interface that emulates the API shape of a node.js readable
 * stream for use in native and web environments.
 */
export interface ReadableStream<T> extends ReadableStreamEvents<T> {

	/**
	 * Stops emitting any events until resume() is called.
	 */
	pause(): void;

	/**
	 * Starts emitting events again after pause() was called.
	 */
	resume(): void;

	/**
	 * Destroys the stream and stops emitting any event.
	 */
	destroy(): void;

	/**
	 * Allows to remove a listener that was previously added.
	 */
	removeListener(event: string, callback: () => unknown): void;
}

/**
 * A interface that emulates the API shape of a node.js readable
 * for use in native and web environments.
 */
export interface Readable<T> {

	/**
	 * Read data from the underlying source. Will return
	 * null to indicate that no more data can be read.
	 */
	read(): T | null;
}


/**
 * A interface that emulates the API shape of a node.js writeable
 * stream for use in native and web environments.
 */
export interface WriteableStream<T> extends ReadableStream<T> {

	/**
	 * Writing data to the stream will trigger the on('data')
	 * event listener if the stream is flowing and buffer the
	 * data otherwise until the stream is flowing.
	 *
	 * If a `highWaterMark` is configured and writing to the
	 * stream reaches this mark, a promise will be returned
	 * that should be awaited on before writing more data.
	 * Otherwise there is a risk of buffering a large number
	 * of data chunks without consumer.
	 */
	write(data: T): void | Promise<void>;

	/**
	 * Signals an error to the consumer of the stream via the
	 * on('error') handler if the stream is flowing.
	 *
	 * NOTE: call `end` to signal that the stream has ended,
	 * this DOES NOT happen automatically from `error`.
	 */
	error(error: Error): void;

	/**
	 * Signals the end of the stream to the consumer. If the
	 * result is provided, will trigger the on('data') event
	 * listener if the stream is flowing and buffer the data
	 * otherwise until the stream is flowing.
	 */
	end(result?: T): void;
}

/**
 * A stream that has a buffer already read. Returns the original stream
 * that was read as well as the chunks that got read.
 *
 * The `ended` flag indicates if the stream has been fully consumed.
 */
export interface ReadableBufferedStream<T> {

	/**
	 * The original stream that is being read.
	 */
	stream: ReadableStream<T>;

	/**
	 * An array of chunks already read from this stream.
	 */
	buffer: T[];

	/**
	 * Signals if the stream has ended or not. If not, consumers
	 * should continue to read from the stream until consumed.
	 */
	ended: boolean;
}

export interface WriteableStreamOptions {

	/**
	 * The number of objects to buffer before WriteableStream#write()
	 * signals back that the buffer is full. Can be used to reduce
	 * the memory pressure when the stream is not flowing.
	 */
	highWaterMark?: number;
}
