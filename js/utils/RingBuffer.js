// ==========================================
// RING BUFFER (O(1) Data Structure)
// ==========================================

export class RingBuffer {
    /**
     * @param {number} capacity - Maximum number of items before oldest is overwritten.
     */
    constructor(capacity) {
        this.capacity = capacity;
        this._buf = new Array(capacity);
        this._head = 0;   // index of oldest entry
        this._tail = 0;   // index of next write slot
        this._size = 0;
    }

    /** O(1) — push a new item, silently evicting the oldest if full. */
    push(item) {
        this._buf[this._tail] = item;
        this._tail = (this._tail + 1) % this.capacity;
        if (this._size < this.capacity) {
            this._size++;
        } else {
            // Buffer is full; advance head to discard oldest entry.
            this._head = (this._head + 1) % this.capacity;
        }
    }

    /** O(n) — return items in insertion order (oldest first). */
    toArray() {
        const out = [];
        for (let i = 0; i < this._size; i++) {
            out.push(this._buf[(this._head + i) % this.capacity]);
        }
        return out;
    }

    /** O(1) */
    clear() { this._head = 0; this._tail = 0; this._size = 0; }

    get size() { return this._size; }
}
