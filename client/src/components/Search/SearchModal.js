import React from 'react';

export default function SearchModal() {
  return (
    <>
      <input type="checkbox" id="search-modal" class="modal-toggle" />
      <label for="search-modal" class="modal cursor-pointer">
        <label class="modal-box relative" for="">
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered input-sm w-full max-w-xs"
          />
          <p class="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
        </label>
      </label>
    </>
  );
}
