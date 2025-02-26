import { createElement } from "react";
import { shallow } from "enzyme";
import { Platform, Dimensions } from "react-native";
import { render } from "@testing-library/react-native";
import { ValueStatus } from "mendix";
import lottieLoading from "./loader.json";

import { CustomStyle, LottieNative } from "../../LottieNative";
import { LottieNativeProps } from "typings/LottieNativeProps";

const json = JSON.stringify(lottieLoading);
describe.each(["ios", "android"])("Lottie Widget for %s", (os: "ios" | "android") => {
    beforeEach(() => {
        Platform.OS = os;
        Platform.select = jest.fn((dict: any) => dict[Platform.OS]);
    });

    const LottieProps: LottieNativeProps<CustomStyle> = {
        name: "Mendix",
        animationJson: json,
        width: "full",
        height: "full",
        isBackground: true,
        loopAnimation: true,
        autoPlayAnimation: true,
        sectionsToPlay: {
            status: ValueStatus.Available,
            value: ""
        },
        style: []
    };

    it("renders the structure correctly", () => {
        const myLottie = shallow(<LottieNative {...LottieProps} />);
        expect(myLottie).toMatchSnapshot();
    });

    it("background prop change Styling correctly", () => {
        const { getByTestId } = render(<LottieNative {...LottieProps} />);
        const foundContainingView = getByTestId("lottieContainerView");
        const { position } = foundContainingView.props.style;
        expect(position).toEqual("absolute");
    });
    it("Width prop to Equate correctly (Full)", () => {
        const windowWidth = Dimensions.get("window").width;
        const { getByTestId } = render(<LottieNative {...LottieProps} />);
        const foundContainingView = getByTestId("lottieContainerView");
        const { width } = foundContainingView.props.style;
        expect(width).toEqual(windowWidth);
    });
    it("Width prop to Equate correctly (Custom)", () => {
        const customWidth = "400";
        const { getByTestId } = render(<LottieNative {...LottieProps} width={customWidth} />);
        const foundContainingView = getByTestId("lottieContainerView");
        const { width } = foundContainingView.props.style;
        expect(width).toEqual(parseInt(customWidth));
    });
    it("Height prop to Equate correctly (Full)", () => {
        const windowHeight = Dimensions.get("window").height;
        const { getByTestId } = render(<LottieNative {...LottieProps} />);
        const foundContainingView = getByTestId("lottieContainerView");
        const { height } = foundContainingView.props.style;
        expect(height).toEqual(windowHeight);
    });
    it("Height prop to Equate correctly (Custom)", () => {
        const customHeight = "400";
        const { getByTestId } = render(<LottieNative {...LottieProps} height={customHeight} />);
        const foundContainingView = getByTestId("lottieContainerView");
        const { height } = foundContainingView.props.style;
        expect(height).toEqual(parseInt(customHeight));
    });
    it("Loop Observed (Animateur)", () => {
        const { getByTestId } = render(<LottieNative {...LottieProps} />);
        const anamateur = getByTestId("lottieAnimaterView");
        expect(anamateur.props.loop).toEqual(LottieProps.loopAnimation);
    });
    it("AutoPlay Observed (Animateur)", () => {
        const { getByTestId } = render(<LottieNative {...LottieProps} />);
        const anamateur = getByTestId("lottieAnimaterView");
        expect(anamateur.props.autoPlay).toEqual(LottieProps.autoPlayAnimation);
    });
    it("source JSon Matched Parsed", () => {
        const { getByTestId } = render(<LottieNative {...LottieProps} />);
        const anamateur = getByTestId("lottieAnimaterView");
        expect(anamateur.props.sourceJson).toEqual(json);
    });
});
