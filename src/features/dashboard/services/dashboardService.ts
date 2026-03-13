import { supabase } from "@/lib/supabase"

export async function getMessagesCount(userId: string, role: string) {
  let query = supabase
    .from("messages")
    .select("*, conversations!inner(user_id)", { count: "exact", head: true })

  if (role !== "admin") {
    query = query.eq("conversations.user_id", userId)
  }

  const { count, error } = await query

  if (error) {
    console.error(error)
    return 0
  }

  return count || 0
}
export async function getConversationsCount(userId: string, role: string) {
    console.log("ROLE:", role)
  let query = supabase
    .from("conversations")
    .select("*", { count: "exact", head: true })

  if (role !== "admin") {
    query = query.eq("user_id", userId)
  }

  const { count, error } = await query

  if (error) {
    console.error("Error fetching conversations count:", error)
    return 0
  }

  return count ?? 0
}

export async function getLastActive(userId: string) {
  const { data } = await supabase
    .from("messages")
    .select("created_at, conversations!inner(user_id)")
    .eq("conversations.user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)

  if (!data || data.length === 0) return "No activity"

return new Date(data[0].created_at).toLocaleDateString("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric"
})
}


export async function getMessagesActivity(userId: string, role: string) {
  const now = new Date()
  const startDate = new Date()
  startDate.setDate(now.getDate() - 6)

  let query = supabase
    .from("messages")
    .select("created_at, conversations!inner(user_id)")
    .gte("created_at", startDate.toISOString())

  if (role !== "admin") {
    query = query.eq("conversations.user_id", userId)
  }

  const { data, error } = await query

  if (error || !data) {
    console.error(error)
    return []
  }

  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

  const result = {
    Sun:0, Mon:0, Tue:0, Wed:0, Thu:0, Fri:0, Sat:0
  }

  data.forEach((msg:any)=>{
    const day = days[new Date(msg.created_at).getDay()]
    result[day]++
  })

  return days.map(day => ({
    day,
    messages: result[day]
  }))
}

export async function getUserStats(userId: string, role: string) {

  const messagesCount = await getMessagesCount(userId, role)
  const conversationsCount = await getConversationsCount(userId, role)

  return {
    messages: messagesCount,
    conversations: conversationsCount
  }

}