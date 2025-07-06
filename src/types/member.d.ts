export type LoginInput = {
  email: string
  password: string
}

export type MemberInfo = {
  userNo: string // 멤버 번호
  userName: string // 이름
  email: string // 이메일
  tel1: string
  tel2: string
  tel3: string
  birthDate: string // 생년월일
  birthYear?: string
  birthMonth?: string
  birthDay?: string
}
