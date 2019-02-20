import React, { Fragment } from "react";
import { Image } from "react-native";
import SkySportsText from "./sky-sports-text";
import styles from "./styles";

const InnerSkySportsBanner = () => (
  <Fragment>
    <SkySportsText text="Premier League clips powered by Sky Sports" />
    <Image
      source={{
        uri:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAARCAYAAABKFStkAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2QUIxNkZGOUI5QjYxMUU4QUZERTg4QTk0NTNGRjRGQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2QUIxNkZGQUI5QjYxMUU4QUZERTg4QTk0NTNGRjRGQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZBQjE2RkY3QjlCNjExRThBRkRFODhBOTQ1M0ZGNEZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZBQjE2RkY4QjlCNjExRThBRkRFODhBOTQ1M0ZGNEZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6LcFWQAADPZJREFUeNrMWHl4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"
      }}
      style={styles.skySportsBadge}
    />
  </Fragment>
);

export default InnerSkySportsBanner;