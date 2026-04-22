function pad(n) { return n < 10 ? "0" + n : String(n); }

function formatStamp(fmt, now) {
  const y = now.getFullYear();
  const m = pad(now.getMonth() + 1);
  const d = pad(now.getDate());
  const hh = pad(now.getHours());
  const mm = pad(now.getMinutes());

  switch (fmt) {
    case "date":     return y + "-" + m + "-" + d;
    case "time":     return hh + ":" + mm;
    case "pretty": {
      const months = ["Jan","Feb","Mar","Apr","May","Jun",
                      "Jul","Aug","Sep","Oct","Nov","Dec"];
      const h12 = ((now.getHours() + 11) % 12) + 1;
      const ampm = now.getHours() < 12 ? "am" : "pm";
      return months[now.getMonth()] + " " + now.getDate() + ", " + y +
             " " + h12 + ":" + mm + ampm;
    }
    case "datetime":
    default:
      return y + "-" + m + "-" + d + " " + hh + ":" + mm;
  }
}

function process(ctx) {
  const fmt = ctx.settings.format || "datetime";
  const anchor = ctx.settings.anchor || "bottom-right";
  const size = Number(ctx.settings.size) || 14;
  const color = ctx.settings.color || "#ffffff";
  const opacity = ctx.settings.opacity !== undefined
    ? Number(ctx.settings.opacity) : 0.7;

  const text = formatStamp(fmt, new Date());
  ctx.image.drawText(text, anchor, 12, 12, size, color, opacity);
  console.log("stamped: " + text);
}
