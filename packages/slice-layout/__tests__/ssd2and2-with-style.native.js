import TestRenderer from "react-test-renderer";
import "./serializers-with-style.native";
import shared from "./ssd2and2.base";

export default () => shared(TestRenderer.create);
