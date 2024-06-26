package usecase

import "errors"

var RecordNotFoundError = errors.New("Record not found")
var RecordConflictError = errors.New("Record already exist")
