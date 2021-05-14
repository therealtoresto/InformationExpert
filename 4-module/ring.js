'use strict';

const alloc = (size) => ({
    size,
    buffer: Buffer.alloc(size),
    offset: 0,
});

const write = (buf, data) => {
    const { size, offset } = buf;
    const { length } = data;
    const avaliable = size - offset;
    const len = Math.min(avaliable, size, length);
    const rest = avaliable - length;
    buf.buffer.write(data, offset, len);
    buf.offset += len;
    if (buf.offset === size) buf.offset = 0;
    if (rest < 0) write(buf, data.slice(rest));
}

const read = (buf) => buf.buffer.toString('utf8');

module.exports = { alloc, write, read };