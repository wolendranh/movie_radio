class ServiceError(Exception):
    """
    General service error
    """


class DecodeServiceError(ServiceError):
    """
    Raised when string can not be properly decoded
    """


class ImproperlyConfiguredServiceError(ServiceError):
    """
    Generic error that is being raised when , for example, some settings.py variable are not defined
    """