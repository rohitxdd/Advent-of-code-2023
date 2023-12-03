lines = []
with open("./input.txt", "r") as file:
    lines = [line.strip() for line in file.readlines()]


rows = len(lines)
cols = len(lines[0])


def get_line(index: int) -> str | None:
    if index < 0:
        return None
    try:
        return lines[index]
    except (ValueError, IndexError):
        return None


def isSymbol(c: str) -> bool:
    return (not c.isdigit()) and c != "."


ops: list[int] = [-1, 0, 1]


def is_part_valid(lineIndex: int, startIndex: int, length: int) -> bool:
    end_index = (
        startIndex + length if startIndex + length == cols else startIndex + length + 1
    )
    start_index = startIndex if startIndex == 0 else startIndex - 1

    for x in ops:
        tempIndex = lineIndex + x
        line = get_line(tempIndex)
        if line:
            for x in line[start_index:end_index]:
                if isSymbol(x):
                    return True
    return False


part_nums: list[int] = []

for index, line in enumerate(lines):
    temp: str = ""
    start_index: int = -1

    for i, char in enumerate(line):
        if char.isdigit():
            if start_index < 0:
                start_index = i
            temp += char
        
        if not char.isdigit() or i + 1 == cols:
            if start_index >= 0:
                isValid: bool = is_part_valid(index, start_index, len(temp))
                if isValid:
                    part_nums.append(int(temp))
                else:
                    # print(temp)
                    pass
            start_index = -1
            temp = ""
print(sum(part_nums))