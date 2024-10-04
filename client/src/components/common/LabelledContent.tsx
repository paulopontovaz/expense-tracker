import { Text, VStack } from "@chakra-ui/react";

type LabelledContentProps = {
    label: string;
    children: React.ReactNode;
};

export function LabelledContent(props: LabelledContentProps) {
    const { label, children } = props;
    return (
        <VStack alignItems="flex-start" spacing={0}>
            <Text fontSize="smaller" fontWeight="bold" opacity={0.5}>
                {label}
            </Text>
            {children}
        </VStack>
    );
}
