
def check_threshold(threshold):
    """
    Check whether the input data is legal
    Args:
        threshold (int):

    Returns:
        Bool

    """
    if len(str(threshold)) < 7 and type(threshold) == int:
        return True
    else:
        return False


def test_check_threshold():
    assert check_threshold(345) == True
    assert check_threshold('44') == False
