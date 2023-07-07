export const spacingTinier = 2
export const spacingTiny = 4
export const spacingSmaller = 6
export const spacingSmall = 8
export const spacingMedium = 16
export const spacingLarge = 24
export const spacingHuge = 32
export const spacingHuger = 48
export const spacingCard = 12
export const spacingHeader = 32

export const boxHeightSmaller = 16
export const boxHeightSmall = 24
export const boxHeightMedium = 32
export const boxHeightMediumLarge = 48
export const boxHeightLarge = 64

export const contentListRowHeightSmall = boxHeightMedium + spacingTiny
export const contentListRowHeight = boxHeightMedium + 2 * spacingSmall

export const contentListRowSpacing = 2 * spacingTiny

// min-Height = header + 3 items
export const contentListMinHeightSmall = 4 * (contentListRowHeightSmall + contentListRowSpacing)
export const contentListMinHeight = 4 * (contentListRowHeight + contentListRowSpacing)

// min-Height without header
export const contentListPlaceholderHeightSmall = 3 * (contentListRowHeightSmall + contentListRowSpacing)
export const contentListPlaceholderHeight = 3 * (contentListRowHeight + contentListRowSpacing)
