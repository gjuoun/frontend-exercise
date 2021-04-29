import React from "react";

export default function Avatar({ src }: { src: string }) {
  return (
    <>
      <img
        width={32}
        height={32}
        className="mr-3 rounded-circle"
        src={src ?? ""}
        alt="avatar"
      />
    </>
  );
}
