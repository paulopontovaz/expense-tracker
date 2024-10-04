import { type BoxProps, Text, type TextProps, VStack } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

type LabelledContentProps = {
    label: string;
    labelFontSize?: TextProps["fontSize"];
} & Pick<BoxProps, "alignItems">;

export function LabelledContent(
    props: PropsWithChildren<LabelledContentProps>,
) {
    const { label, labelFontSize = "smaller", children, ...boxProps } = props;

    return (
        <VStack alignItems="flex-start" spacing={0} {...boxProps}>
            <Text fontSize={labelFontSize} fontWeight="bold" opacity={0.5}>
                {label}
            </Text>
            {children}
        </VStack>
    );
}
