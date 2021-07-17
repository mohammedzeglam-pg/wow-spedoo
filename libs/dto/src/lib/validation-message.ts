export class ValidationMessage {
  static enum = 'حدث خطأ غير متوقع';
  static phone =
    'رقم الهاتف غير صحيح يجب ان يكون على هذه الصيغة 0000000 90 218';
  static minLength = ' يحب أن يكون اطول من $constraint1 $property';
  static maxLength = 'يجب أن يكون أقصر من $constraint1 $property';
  static email = 'البريد الاكتروني الدي ادخلته غير صالح';
  static password = 'كلمة المرور ضعيفة جدا';
}
