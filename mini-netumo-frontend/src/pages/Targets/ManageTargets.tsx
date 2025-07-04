import { useQuery } from '@tanstack/react-query'
import { fetchTargets } from '@/services/targetService'
import TargetCard from '@/components/targets/TargetCard'
import Button from '@/components/ui/Button'
import { Link } from 'react-router-dom'

export default function ManageTargets() {
  const {
    data: targets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['targets'],
    queryFn: fetchTargets,
  })

  if (isLoading) return <div className="p-4">Loading targets...</div>
  if (error) return <div className="p-4">Error loading targets</div>

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Targets</h1>
        <Link to="/targets/add">
          <Button variant="primary">Add New Target</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {targets?.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No targets found</p>
            <Link to="/targets/add">
              <Button variant="primary">Create Your First Target</Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {targets?.map((target) => <TargetCard key={target.id} target={target} />)}
          </div>
        )}
      </div>
    </div>
  )
}
