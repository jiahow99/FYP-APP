import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useCallback, useMemo } from "react";

// snap points
export const snapPoints = (points) => useMemo(() => points, []);

// backdrop
export const renderBackdrop = (appear, dissapear=null, pressBehavior="collapse") => useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={appear}
        disappearsOnIndex={dissapear}
        pressBehavior={pressBehavior}
      />
    ),
    []
);