import TestRenderer from "react-test-renderer";
import "./serializers-with-style.native";
import shared from "./front-l1.base";

export default () => shared(TestRenderer.create);
